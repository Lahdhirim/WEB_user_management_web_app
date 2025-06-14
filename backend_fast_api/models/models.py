from pydantic import BaseModel, Field
from datetime import datetime

class User(BaseModel):
    first_name: str
    last_name: str
    company_id: int = Field(..., ge=100000, le=999999)
    position: str
    join_date: datetime = datetime.now()
    read_permission: bool = False
    edit_permission: bool = False
    deploy_permission: bool = False

