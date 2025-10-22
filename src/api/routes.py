"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import email
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/login", methods=["POST"])
def handle_login():
    body = request.json
    email = body.get("email", None)
    password = body.get("password", None)
    if email is None or password is None:
        return jsonify(dict(message="Missing Credentials")), 400
    user = db.session.scalars(select(User).where(
        User.email == email)).one_or_none()
    if user is None:
        return jsonify(dict(message="User doesn't exist")), 400
    if user.password != password:
        return jsonify(dict(message="Bad Credentials")), 400
    # user has been authenticated
    # create the token
    user_token = create_access_token(identity=str(user.id))
    response_body = dict(
        token=user_token,
        user=user.serialize()
    )
    return jsonify(response_body), 201
