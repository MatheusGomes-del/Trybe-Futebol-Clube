import * as bcrypt from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../helpers/token';

export const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjY1NDQ0NDg3LCJleHAiOjE2NjU5NjI4ODd9._eHb9_ZIc7FEAW-Ah9erSkoqiKM21mp6CSG4kyJsafQ`

const userWithouPassword = {
    email: "admin@admin.com"
}

const userWithouEmail = {
    password: 'omaiouamooshindeirunani'
}

const invalidUser = {
    email: 'sexto@semtido.com',
    password: 'autoastral123',
}

const validUser = {
    email: 'azazel@hell.com',
    password: bcrypt.hashSync('opentostreet'),
};
  
const validUserDecoded = {
    email: 'azazel@hell.com',
    password: 'opentostreet',
}

const MESSAGE_ERROR_INVALID_USER = {
	"message": "Incorrect email or password"
} 

const MESSAGE_ERROR_LESS_INFORMATION = {
	"message": "All fields must be filled"
}

const userToken = Jwt.sign({ userEmail: validUserDecoded.email }, JWT_SECRET, { algorithm: 'HS256', expiresIn: '6d' },
);

const role = {
    email: 'azazel@hell.com',
    password: 'opentostreet',
    role: 'admin'
}

export { 
    userWithouEmail, 
    userWithouPassword, 
    validUser, 
    validUserDecoded, 
    invalidUser, 
    MESSAGE_ERROR_INVALID_USER, 
    MESSAGE_ERROR_LESS_INFORMATION,
    userToken,
    role
 }

