import User from '../mongodb/models/user.js'

const getAllusers = async (req,res) => {
    try {
        const users= await User.find({}).limit(req.query._end);

        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
};

const createUser = async (req,res) => {
    try {
        const { name, email, avatar } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) return res.status(200).json(userExists);

        const newUser = await User.create({
            name,
            email,
            avatar,
        });

        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const getUserInfoByID = async (req,res) => {
    try {
        const {id} = req.params;
    const user = await User.findOne({ _id: id}).populate('allProperties')

    if(user) return res.status(200).json(user);

    return res.status(404).json({message: 'User not found'})
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
};

export{
    getAllusers,
    createUser,
    getUserInfoByID,
}