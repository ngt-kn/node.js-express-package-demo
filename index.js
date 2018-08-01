const Joi = require('joi');
const express  = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course 1' },
    { id: 2, name: 'course 2' },
    { id: 3, name: 'course 3' }
];

/**
 * http Get request
 */
app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    
    // Return 404 if not found
    if (!course) {
      return res.status(404).send('The course with the given ID was not found.');
        
    } else {
        res.send(course);
    }
});

/**
 * http Post Request
 */
app.post('/api/courses', (req, res) => {
    // result.error
    const { error } = validateCourse(req.body); 

    // If error, send error the return
    if(error){
        // return code 400 (Bad Request)
        return res.status(400).send(error.details[0].message);
    }
    
    // Add new course
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

/**
 * http Put Request
 */
app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    
    // Return 404 if not found
    if (!course) {
       return res.status(404).send('The course with the given ID was not found.');
    }

    // result.error
    const { error } = validateCourse(req.body); 

    // If error, send error the return
    if(error){
        // return code 400 (Bad Request)
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
        // Look up the course
        const course = courses.find(c => c.id === parseInt(req.params.id));
    
        // Return 404 if not found
        if (!course) {
            return res.status(404).send('The course with the given ID was not found.');
        }

        // Delete
        const index = courses.indexOf(course);
        courses.splice(index, 1);
    
        res.send(course);
});

// Validate request input
function validateCourse(course) {
        // Create schema for Joi
        const schema = {
            name: Joi.string().min(3).required()
        };
        // Store result of Joi validation
        return Joi.validate(course, schema);
}

// PORT 
// const port = process.env.PORT || 3000;
const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));