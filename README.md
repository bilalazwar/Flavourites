
# Flavourites

A secure recipe sharing app built with the MERN stack. Users can manage their own recipes, rate others, and find inspiration – all with `JWT Token` authentication.

## Technology

- MERN Stack

| ![Mongo DB](pictures/mongoDB.jpeg) | ![Express](pictures/express.png) | ![React](pictures/reactJs.png) | ![NodeJs](pictures/nodejs.jpeg) |
|---|---|---|---|

## Status

ON-PROGRESS.

## Role

| Group Members | Role | Link |
| ------ | ------ | ------ |
| Bilal Azwar | BACK-END |[Back-End Link]( https://github.com/bilalazwar/Flavourites/tree/main/BACK-END/Flavourites) |
| Bilal Hamza | FRONT-END | [Front-End Link]( https://github.com/) |

## Back-End

**ER Diagram**


| ER Diagram |
|---|
| ![ER Diagram](pictures/flavouritesRecipeER.png) |

**User-Entity:**

* `_id`: (ObjectId, auto-generated).
* `name`: (string) User's email address.
* `email`: (string) This field enforces validation to ensure a valid email address is provided.
* `profilePictureUrl`: (string) URL for the user's profile picture.
* `bio`: (string) User's short biography.
* `location`: (string, optional) User's location (e.g, city, country).

**User-Login Entity:**

* `_id`: (ObjectId, auto-generated).
* `user_id`: (ObjectId) Unique identifier referencing the user (foreign key).
* `username`: (String, Unique) Ensures uniqueness to prevent duplicate usernames.
* `password`: (String) Implement secure password hashing techniques (bcrypt) before storing passwords.
* `userType`: (String) Role within the system (e.g admin, user).


**Recipe Entity:**

* `_id`: (ObjectId, auto-generated).
* `user_id`: (string) Replace with a valid user ID or create a dummy user first.
* `title`: (string) Title of the recipe.
* `description`: (string) Description of the recipe.
* `course`: (string) Course type (e.g., Main Course, Appetizer, Dessert).
* `cuisine`: (string) Cuisine type (e.g., Italian, Mexican, Indian).
* `instructions`: (string, optional) Instructions for making the recipe. Uncomment this field if you want to include them.
* `prepTime`: (integer) Preparation time in minutes.
* `imageUrl`: (string) URL of the recipe image.

**Ingredient Entity:**

* `_id`: (ObjectId, auto-generated).
* `user_id`: (ObjectId) Unique identifier referencing the user (foreign key).
* `name`: (String) Name of the ingredient.
* `quantity`: (String) Quantity of the ingredient
* `unit`: (String) Unit of measurement for the quantity (e.g., "cup", "tablespoon", "ml")..
* `notes`: (String) Additional details about the ingredient.


**Rating Entity:**

* `_id`: (ObjectId, auto-generated).
* `user_id`: (ObjectId) Unique identifier referencing the user (foreign key).
* `recipe_id`: (ObjectId) Unique identifier referencing the Recipe (foreign key).
* `value`: (Number) The actual rating value for the recipe (1-5).
* `description`: (String) User's description or comment accompanying the rating.

## Controllers
All the REST end-points for different routes

### UserLogin-Controller
---------------------------------------------------

This is subheading.

**Sign IN**

```sh
http://localhost:5000/login/register     ----->  Method: POST
```
```json
{
  "userId": "",  // foreign key
  "username": "", 
  "password": "",
  "userType": "",
}
```

**Login**
* Upon validation generates JWT Token.

```sh
http://localhost:5000/login         ----->  Method: POST
```
```json
{
  "username": "", 
  "password": "",
}
```

**Update Password**
* JWT Token necessary.
* Validate the JWT username and request body username are the  same?

```sh
http://localhost:5000/login        ----->  Method: PUT
```
```json
{
  "username": "",
  "password": "",
}
```

### User-Controller
---------------------------------------------------

- JWT Token necessary ( admin & User) for all requests.

**Create new User**

```sh
http://localhost:5000/users        ----->  Method: POST
```
```json
{
  "name": "",
  "email": "",
  "profilePictureUrl": "",
  "bio": "",
  "location": ""
}
```

**Display All Users**

```sh
http://localhost:5000/users        ----->  Method: GET
```

**Find User By ID**

```sh
http://localhost:5000/users/:user_id        ----->  Method: GET
```

**Find User By Email**
```sh
http://localhost:5000/users/:email          ----->  Method: GET
```

**Find User By Location**
```sh
http://localhost:5000/users/:location       ----->  Method: GET
```

**Delete User By ID**
```sh
http://localhost:5000/users/:user_id        ----->  Method: DELETE
```

**Update User By ID**
```sh
http://localhost:5000/users/:user_id        ----->  Method: PUT
```


### Recipe-Controller

* All Recipe-Endpoint requires JWT token

**Create new Recipe**

```sh
http://localhost:5000/recipes         ----->  Method: POST
```
```json
{
  "title": "",
  "description": "",
  "course": "",
  "cuisine": "",
  "instructions": "", // optional
  "prepTime": , // integer
  "imageUrl": ""
}
```

**Update Recipe**

Pass the fields that you only need to updaate
```sh
http://localhost:5000/recipes        ----->  Method: PUT
```

**Find Recipe**
```sh
http://localhost:5000/recipes/:recipeId    ----->  Method: GET
```

**Find Recipes By User ID**

```sh
http://localhost:5000/recipes?userId=userId    ----->  Method: GET
```

**Delete Recipe**

* Checks if the Recipe belongs to the user From JWT Token.
* Or else other users will delete other members recipes.
```sh
http://localhost:5000/recipes?recipeID=RECIPE_ID    ----->  Method: DELETE
```



**Body:**

The request body requires the following fields in JSON format:

* `user_id`: (string) Replace with a valid user ID or create a dummy user first.
* `title`: (string) Title of the recipe.
* `description`: (string) Description of the recipe.
* `course`: (string) Course type (e.g., Main Course, Appetizer, Dessert).
* `cuisine`: (string) Cuisine type (e.g., Italian, Mexican, Indian).
* `instructions`: (string, optional) Instructions for making the recipe. Uncomment this field if you want to include them.
* `prepTime`: (integer) Preparation time in minutes.
* `imageUrl`: (string) URL of the recipe image.

### Rating-Controller

* All Rating-Endpoint requires a valid JWT token

**Create Rating**

```sh
http://localhost:5000/recipes/:RecipeId(454)/ratings     ----->  Method: POST
```
```json
{
  "recipe_id": "",  // foreign key
  "value" : ,       // 1-5
  "description": ""
}
```

**Find All Rating**

```sh
http://localhost:5000/ratings/all-ratings     ----->  Method: GET
```

**Find Rating**

```sh
http://localhost:5000/recipes/:RecipeId(454)/ratings     ----->  Method: GET
```

**Update Rating**

```sh
http://localhost:5000/recipes/ratings/:RatingId(232)     ----->  Method: PUT
```

**Delete Rating**
```sh
http://localhost:5000/recipes/ratings/:RatingId(232)     ----->  Method: DELETE
```
