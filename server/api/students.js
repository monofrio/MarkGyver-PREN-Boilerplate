const router = require('express').Router();
const { Student, Campus } = require('../db');

router.get('/', async (req, res, next) => {
    try {
        const students = await Student.findAll({
            include: {
                model: Campus
            }
        });
        res.json(students);
    } catch (err) {
        next(err)
    }
})

router.get('/:studentId', async (req,  res, next) => {
    try {
        const student = await Student.findByPk( req.params.studentId, {
            include: {
                model: Campus
            }
        });

        res.json(student)
    }
    catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        res.status(201).send(await Student.create(req.body))
    } catch (err) {
        next(err)
    }
})

router.put('/:studentId', async(req, res, next) => {
    try {
        const student = await Student.findByPk(  req.params.studentId
            , {
            include: {
                model: Campus
            }
        }
        );
        res.send(await student.update( req.body ));
    }
    catch (err){
        next(err);
    }
});

router.delete('/:studentId', async (req, res, next) => {
    try {
        const id = req.params.studentId;
        await Student.destroy({ where: { id } })
        res.status(204).end();
    }
    catch (err) {
        next(err)
    }
})

module.exports = router
