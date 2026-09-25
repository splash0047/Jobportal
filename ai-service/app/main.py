import os
import secrets
import tempfile
from fastapi import FastAPI, UploadFile, File, Header, HTTPException
from app.core.resume_parser import parse_resume

app = FastAPI()
MAX_PDF_BYTES = 5 * 1024 * 1024

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/parse-resume")
async def parse_resume_endpoint(file: UploadFile = File(...), x_service_token: str = Header(default="")):
    expected = os.environ.get("AI_SERVICE_TOKEN")
    if not expected or not secrets.compare_digest(x_service_token, expected):
        raise HTTPException(status_code=401, detail="Unauthorized")
    if file.content_type != "application/pdf" or not (file.filename or "").lower().endswith(".pdf"):
        raise HTTPException(status_code=415, detail="Only PDF resumes are supported")

    path = None
    try:
        with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as temporary:
            path = temporary.name
            total = 0
            first = True
            while chunk := await file.read(65536):
                if first and not chunk.startswith(b"%PDF-"):
                    raise HTTPException(status_code=415, detail="Invalid PDF file")
                first = False
                total += len(chunk)
                if total > MAX_PDF_BYTES:
                    raise HTTPException(status_code=413, detail="PDF exceeds 5 MB")
                temporary.write(chunk)
        if not total:
            raise HTTPException(status_code=415, detail="Empty PDF file")
        return {"filename": file.filename, "parsed_data": parse_resume(path)}
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=422, detail="PDF could not be parsed") from None
    finally:
        await file.close()
        if path:
            os.unlink(path)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
