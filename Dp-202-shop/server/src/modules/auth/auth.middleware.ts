import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Unauthorized } from '../../common/errors/unauthorized';
import { authModel } from './auth.service';

const customFields = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    passReqToCallback: true
}

const strategy = new Strategy(customFields, 
    async function (req,jwtPayload, done) {

        try {
            const user = await authModel.findUserById(jwtPayload.id);
            if (!user) {
                done (null,false)
            } else {
                req.params.user = user;
                done(null,user);
            }
        } catch(err) {
            return done(new Unauthorized('Unauthorized'));
        }
    }
);

passport.use(strategy);

export const authenticate = passport.authenticate('jwt', {session:false});


// Example of usage authMiddleware or adminMiddleware
// authRouter.get('/user', adminAuth,  (req,res) => {const {user} = req.params;res.send(user)});