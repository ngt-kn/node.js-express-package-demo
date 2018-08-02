
const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'course 1' },
    { id: 2, name: 'course 2' },
    { id: 3, name: 'course 3' }
];

/**
 * http Get request
 */

 router.get('/', (req, res) => {
    res.send(courses);
});

 router.get('/:id', (req, res) => {
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
 */ router.post('/', (req, res) => {
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
 */ router.put('/:id', (req, res) => {
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

/**
 * delete request
 */ router.delete('/:id', (req, res) => {
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

module.exports = router;