import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const secret = 'test';
import Agency from '../models/Agency';

export const login = async(req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await Agency.findOne({ email });
        if (!existingUser)
          return res
            .status(404)
            .json({ error: "User doesn't exist. Please try again" });
    
        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword)
          return res.status(400).json({ error: 'Incorrect Password.' });
    
        const token = jwt.sign(
          {
            email: existingUser.email,
            role: existingUser.role,
            id: existingUser._id,
          },
          'test',
          { expiresIn: '1h' }
        );
    
        res.status(200).json({ result: existingUser, token });
      } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
      }

        
}

export const signup = async (req,res) => {
    const { name, email, password, location, type, phone_number, security_question, security_answer, longitude, latitude, licenseNo} = req.body;
    try{
        const oldAgency = await Agency.findOne({licenseNo});
        const oldUser = await Agency.findOne({email});
        
        if(oldAgency) return res.status(400).json({ message: "Agency already exists" });
        if(oldUser) return res.status(400).json({ message: "Agency already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await Agency.create({ name, email, password: hashedPassword, location, type, phone_number, security_question, security_answer, longitude, latitude, licenseNo}); 
        
        const token = jwt.sign({ email: result.email, licenseNo: result.licenseNo, id: result._id }, secret, { expiresIn: "1h" });

        res.status(201).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};
