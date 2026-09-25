import asyncio
import io

import pytest
from fastapi import HTTPException, UploadFile
from app import main


def upload(data=b"%PDF-1.4\nsmall document", name="resume.pdf", content_type="application/pdf"):
    return UploadFile(file=io.BytesIO(data), filename=name, headers={"content-type": content_type})


def test_authentication_and_pdf_validation(monkeypatch, tmp_path):
    monkeypatch.setenv("AI_SERVICE_TOKEN", "test-internal-token")
    monkeypatch.setattr(main.tempfile, "tempdir", str(tmp_path))
    with pytest.raises(HTTPException) as denied:
        asyncio.run(main.parse_resume_endpoint(upload(), x_service_token="wrong"))
    assert denied.value.status_code == 401

    with pytest.raises(HTTPException) as invalid:
        asyncio.run(main.parse_resume_endpoint(upload(data=b"not a pdf"), x_service_token="test-internal-token"))
    assert invalid.value.status_code == 415
    assert list(tmp_path.iterdir()) == []


def test_parser_uses_temporary_file_and_removes_it(monkeypatch, tmp_path):
    monkeypatch.setenv("AI_SERVICE_TOKEN", "test-internal-token")
    monkeypatch.setattr(main.tempfile, "tempdir", str(tmp_path))
    monkeypatch.setattr(main, "parse_resume", lambda path: {"skills": ["Python"]})
    result = asyncio.run(main.parse_resume_endpoint(upload(name="../../user.pdf"), x_service_token="test-internal-token"))
    assert result["parsed_data"]["skills"] == ["Python"]
    assert list(tmp_path.iterdir()) == []
