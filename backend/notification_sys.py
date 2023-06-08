from flask import Flask, request, jsonify, make_response, Response
import traceback
from flask_api import status
import time
import json
import datetime


from db_functions import DbFunctions

db = DbFunctions()


from models import (
    SignupRequestDataModel,
    SignupResponseModel,
    LoginRequestDataModel,
    LoginResponseModel,
    SignoutResponseModel,
)

from services import (
    UserLoginService,
    UserSignupService,
    SessionService,
    CookieService,
    UserSignoutService,
    TaskService,
    JournalService,
)

config = {
    "DEBUG": True,  # some Flask specific configs
}

app = Flask(__name__)


# Instantiate the company signup and login services
signup_service = UserSignupService()
login_service = UserLoginService()
cookie_service = CookieService()


def get_current_tasks(user_id):
    time.sleep(2)

    response = db.call_proc_with_result("send_task_notifications", (user_id,))

    current_time = datetime.datetime.now().time()

    print(f"Running at {current_time}", response, user_id)

    if response:
        tasks = [
            {
                "title": title[0],
                "reminder": title[1].strftime("%Y-%m-%d %H:%M:%S")
                if title[1]
                else None,
            }
            for title in response
        ]

    else:
        tasks = []  # or you can set a default value

    return tasks


def event_stream(user_id):
    while True:
        tasks = get_current_tasks(user_id)
        yield "data: {}\n\n".format(json.dumps(tasks))


@app.route("/task_updates")
def task_updates():
    user_id = request.args.get("user_id")

    print(user_id)

    def event_stream():
        while True:
            tasks = get_current_tasks(user_id)
            yield "data: {}\n\n".format(json.dumps(tasks))

    response = Response(event_stream(), mimetype="text/event-stream")
    return _corsify_actual_response(response)


def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    response.headers.add(
        "Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With"
    )
    response.headers.add(
        "Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"
    )
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response


def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    response.headers.add(
        "Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With"
    )
    response.headers.add(
        "Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"
    )
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8083, debug=True)
