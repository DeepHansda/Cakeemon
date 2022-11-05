const UserModel = require('../DB/models/userModel')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ErrorHandler = require('../services/errorHandler');
const tokenHandler = require('../services/tokenHandler');
module.exports = {
    signUp: catchAsyncErrors(async (req, res, next) => {
        const {
            first_name,
            last_name,
            genders,
            email,
            mobile_number,
            password,
            role
        } = req.body;

        const data = {
            full_name : first_name+' '+last_name,
            genders:genders,
            email:email,
            mobile_number: mobile_number,
            password:password,
            avatar: 'http://fffewsf',
            role
        }

        await UserModel.findOne({email}).exec(async (err, user) => {
            if(err) {
                return next(new ErrorHandler(err.message, 401))
            }

            if(user){
                return next(new ErrorHandler(`${user.email} is already registered`, 401))
            }


            const _user = new UserModel(data)

            await _user.save(async (err, user) => {
                if (err) {
                    console.log(err)
                    if (err) {
                        return next(new ErrorHandler(err.message, 401))
                    }
    
                    return next(new ErrorHandler(`registration faild`, 401))
    
                } else {
                    await tokenHandler(res,200,user)
                }
            })


        })
    }),


    login: catchAsyncErrors(async (req, res, next) => {
        const {
            email,
            password
        } = req.body;


        if (!email || !password) {
            return next(new ErrorHandler('please enter email or password', 401));
        }
        await UserModel.findOne({
            email
        }).exec(async (err, user) => {
            if (err || !user) {
                return next(new ErrorHandler('user not found ,please signup', 401))
            }


            const isCorrect = await user.comparePassword(password)


            if (!isCorrect) {
                return next(new ErrorHandler("Invalid email or password", 401))
            }

            await tokenHandler(res,200,user)
        })
    }),

    logout:catchAsyncErrors(async (req, res, next) => {
        res.cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
        });
      
        res.status(200).json({
          success: 1,
          message: "Logged Out",
        });
      }),

    getUsers: catchAsyncErrors(async (req, res, next) => {
        
        await UserModel.find({}).exec((err, users) => {
            if (err) {
                console.log(err)
                return next(new ErrorHandler('something went wrong', 401))
            } else if (!users || users.length === 0) {
                return next(new ErrorHandler('no users found', 401))
            } else {
                res.status(200).json({
                    success: 1,
                    users
                })
            }
        })

    }),

    getUserById: catchAsyncErrors(async (req, res, next) => {
        const id = req.params.id
        await UserModel.find({_id: id}).exec((err, user) => {
            if (err) {
                console.log(err)
                return next(new ErrorHandler('something went wrong', 401))
            } else if (!user || user.length === 0) {
                return next(new ErrorHandler('does not exist', 401))
            } else {
                res.status(200).json({
                    success: 1,
                    user
                })
            }
        })
    }),


    userDetails: catchAsyncErrors(async (req, res, next) => {
        await UserModel.findById({_id:req.user._id}).exec((err, user) => {
            if (err) {
                console.log(err)
                return next(new ErrorHandler('something went wrong', 401))
            } else if (!user || user.length === 0) {
                return next(new ErrorHandler('does not exist', 401))
            } else {
                res.status(200).json({
                    success: 1,
                    user
                })
            }
        })
    }),

    deleteUser:catchAsyncErrors(async (req, res, next) => {
        const {id} = req.params
        await UserModel.findByIdAndDelete({_id: id}).exec((err, result) => {
            if (err) {
                console.log(err)
                return next(new ErrorHandler('something went wrong', 401))
            } else if (!result || result.length === 0) {
                return next(new ErrorHandler('does not exist', 401))
            } else {
                res.status(200).json({
                    success: 1,
                    message:'user deleted successfully',
                    result

                })
            }
        })
    })
}