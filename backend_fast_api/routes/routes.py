from fastapi import APIRouter, HTTPException
from models.models import User
from models.schemas import all_users
from configurations import users_collection
from bson import ObjectId

router = APIRouter()

@router.post("/users")
async def create_user(user: User):
    try:
        new_user = users_collection.insert_one(dict(user))
        return {"id": str(new_user.inserted_id), "messaage": "New user created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/users")
async def get_users():
    users = users_collection.find()
    return all_users(users)

@router.put("/users/{user_id}")
async def update_user(user_id: str, user: User):
    try:
        id = ObjectId(user_id)
        existing_user = users_collection.find_one({"_id": id})
        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found")
        updated_user = users_collection.update_one({"_id": id}, {"$set": dict(user)})
        return {"modified_count": updated_user.modified_count, "message": "User updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/users/{user_id}")
async def delete_user(user_id: str):
    try:
        id = ObjectId(user_id)
        existing_user = users_collection.find_one({"_id": id})
        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found")
        deleted_user = users_collection.delete_one({"_id": id})
        return {"deleted_count": deleted_user.deleted_count, "message": "User deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))