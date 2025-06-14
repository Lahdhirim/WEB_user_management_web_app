def user_data(user):
    return {
        "id": str(user["_id"]),
        "first_name": user["first_name"],
        "last_name": user["last_name"],
        "company_id": user["company_id"],
        "position": user["position"],
        "join_date": user["join_date"],
        "read_permission": user["read_permission"],
        "edit_permission": user["edit_permission"],
        "deploy_permission": user["deploy_permission"]
    }

def all_users(users):
    return [user_data(user) for user in users]