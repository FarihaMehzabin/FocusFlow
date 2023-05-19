from flask import Flask, request, jsonify, make_response
import traceback
from flask_api import status


from models import SignupRequestDataModel , SignupResponseModel, LoginRequestDataModel, LoginResponseModel, SignoutResponseModel

from services import UserLoginService, UserSignupService, SessionService, CookieService, UserSignoutService, TaskService

config = {
    "DEBUG": True,  # some Flask specific configs
}

app = Flask(__name__)


# Instantiate the company signup and login services
signup_service = UserSignupService()
login_service = UserLoginService()
cookie_service = CookieService()


@app.route("/user/signup", methods=["POST", "OPTIONS"])
def sign_up():
    try:
        
        if request.method == "OPTIONS":  # Respond to CORS preflight request
            return _build_cors_preflight_response()
        
        if request.method == "POST":
            request_data = request.get_json()
            
            if not request_data:
                return jsonify(error="Request body is empty or not in JSON format."), 400
            
            # Parse the request data and create a data model object
            user_data = SignupRequestDataModel(request_data)

            # If there was an error in parsing the request data, return the error message
            if not user_data.isValid():
                return jsonify(error=user_data.error_message), 400

            # Process the signup request using the signup service
            signup_response = signup_service.user_signup(user_data)

            # Create a response data model object with the signup response
            response_data = SignupResponseModel(signup_response)

            # Return the response data as JSON
            return _corsify_actual_response(jsonify(response_data.to_dict()))


    except Exception as err:
        return jsonify({"error": "An unexpected error occurred. Please contact the support team."}), 500
        

@app.route("/user/login", methods=["POST", "OPTIONS"])
def login():
    try:
        
        if request.method == "OPTIONS":  # Respond to CORS preflight request
            return _build_cors_preflight_response()
        
        session_service = SessionService()
        # Parse the request data and create a data model object
        user_data = LoginRequestDataModel(request.get_json())
        
        # If there was an error in parsing the request data, return the error message
        if not user_data.isValid():
            return jsonify(error=user_data.error_message), 400

        # Process the login request using the login service
        login_response = login_service.user_login(user_data)
        
        session_guid = None
        
        # create session
        if login_response.user_logged:
            # Create a new session using the ID
            response = session_service.create_session(login_response.user_id)
            
            if response:
                session_guid = response.guid

            # Create a response data model object with the login response
            response_data = LoginResponseModel(login_response, session_guid)
        
            return _corsify_actual_response(jsonify(response_data.to_dict()))

        else:
            # Return a 401 Unauthorized status code and an error message
            return jsonify({"error": "Login unsuccessful."}), 401

    except Exception as err:
        print(traceback.format_exc())
        return jsonify({"error": "An unexpected error occurred. Please contact the support team."}), 500


# Route for checking the validity of a company cookie
@app.route("/check-cookie-validity/<guid>", methods=["POST"])
def check_cookie_validity_comp(guid):
    try:
        # Instantiate the session service
        session_service = SessionService()

        # Check the session validity for the provided GUID
        response = session_service.check_session_user(guid)

        # Return the response data as JSON
        return jsonify(valid = response.session_valid, user_id = response.user_id)

    except Exception as err:
        print(traceback.format_exc())
        return jsonify({"error": "An unexpected error occurred. Please contact the support team."}), 500


@app.route("/user/logout", methods=["POST", "OPTIONS"])
def sign_out():
    if request.method == "OPTIONS":  # Respond to CORS preflight request
        return _build_cors_preflight_response()

    try:
        request_data = request.get_json()
        
        if not request_data:
            return _corsify_actual_response(jsonify(error="Request body is empty or not in JSON format.")), 400
        guid = request_data.get("guid")
        if not guid:
            return _corsify_actual_response(jsonify(error="GUID is not provided.")), 400
        
        signout_service = UserSignoutService()

        # Process the signout request using the signout service
        signout_response = signout_service.user_signout(guid)
        
        # Create a response data model object with the signout response
        response_data = SignoutResponseModel(signout_response[0], signout_response[1])

        # Return the response data as JSON
        return _corsify_actual_response(jsonify(response_data.to_dict()))

    except Exception as err:
        print(traceback.format_exc())
        return _corsify_actual_response(jsonify({"error": "An unexpected error occurred. Please contact the support team."})), 500


@app.route('/tasks', methods=['GET', 'POST', 'DELETE', 'PUT'])
def handle_tasks():
    try:
    
        task_service = TaskService()
        
        if request.method == 'GET':
            user_id = request.args.get('user_id')
            section = request.args.get('section')
            
            response = task_service.get_tasks(user_id, section)
            
            return response

        elif request.method == 'POST':
            new_task = {
                "title": request.json.get('title'),
                "section_status": request.json.get('section_status'),
                "categories": request.json.get('categories', ["Task"]),
                "reminder": {
                    "date": request.json.get('reminder', {}).get('date'),
                },
                "created_at": request.json.get('created_at'),
                "user_id": request.json.get('user_id')
            }
            
            response = task_service.add_tasks(new_task)
            
            if response:
                return jsonify(message = "New task added", id = response), 201
            
            return jsonify(message = "Failed to add new task"), 201
        
        elif request.method == 'DELETE':
            task_id = request.args.get('task_id')
            
            response = task_service.delete_task(task_id)
            
            if response:
                return jsonify(message = "Task deleted")
            
        elif request.method == 'PUT':
            
            res = request.get_json()
            
            print(res)
            
            updated_item = {
                "id": request.json.get('id'),
                "title": request.json.get('title'),
                "categories": request.json.get('categories'),
                "reminder": request.json.get('reminder'),
                "updated_at": request.json.get('updated_at'),
            }

            response = task_service.update_task(updated_item)

            if response:
                return jsonify(message="Task updated")
            else:
                return jsonify(message="Error updating task"), 400

                
    
    except Exception as err:
        print(traceback.format_exc())

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    response.headers.add('Access-Control-Allow-Headers', "Content-Type, Authorization, X-Requested-With")
    response.headers.add('Access-Control-Allow-Methods', "GET, POST, OPTIONS, PUT, DELETE")
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    response.headers.add('Access-Control-Allow-Headers', "Content-Type, Authorization, X-Requested-With")
    response.headers.add('Access-Control-Allow-Methods', "GET, POST, OPTIONS, PUT, DELETE")
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)