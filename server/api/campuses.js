const router = require('express').Router()
const { Campus, Student } = require('../db')

router.get('/', async (req, res, next) => {
    try {
        const campuses = await Campus.findAll({
            include: {
                model: Student
            }
        });
        res.json(campuses);
    } catch (err) {
        next(err)
    }
})

router.get('/:campusId', async (req,  res, next) => {
    try {
        const campus = await Campus.findByPk( req.params.campusId, {
            include: {
                model: Student
            },
            where: {
                studentId: req.params.campusId
            }
        });
        res.json(campus)
    }
    catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        res.status(201).send(await Campus.create(req.body))
    } catch (err) {
        next(err)
    }
})

router.put('/:campusId', async(req, res, next) => {
    try {
        const campus = await Campus.findByPk(req.params.campusId)
        res.send(await campus.update(req.query));
    }
    catch (err){
        next(err);
    }
});


router.delete('/:campusId', async (req, res, next) => {
    try {
        const id = req.params.campusId;
        await Campus.destroy({ where: { id } })
        res.status(204).end();
    }
    catch (err){
        next(err)
    }
})


router.put('/:id/students/:studentId', async (req, res, next) => {
    try {
        const student = await Student.findByPk(req.params.studentId);
        const campus = await Campus.findByPk(req.params.id);
        campus.removeStudent(student);
        res.json(student);
    } catch(err) {
        next(err);
    }
})

module.exports = router
