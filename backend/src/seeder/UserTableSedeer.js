import user from "../models/user.js";


class userTable{

    constructor() {
        let usersData = [
            {
                "name": 'nishit',
                "username": 'nishit33',
                "email": 'nishitrana0505@gmail.com',
                "gender": 'male',
                "password": 'nishit33',
                "role": 'admin',
                "status": 'active',
                "language": ['nepali', 'hindi'],
                "country": 'nepal'
            },
            {
                "name": 'sandip',
                "username": 'sandip22',
                "email": 'sandip@gamil.com',
                "gender": 'male',
                "password": 'sandip33',
                "role": 'user',
                "status": 'active',
                "language": ['nepali', 'hindi', 'chinese'],
                "country": 'china'
            }
        ];

        usersData.map((data) => {
            user.find({role: data.role}).then((docs) => {
                if (docs.length === 0) {
                    let hObj = new user(data);
                    hObj.save().then((res) => {
                        console.log("userTable: " + data.role + " created");
                    });
                }
            }).catch((err) => {
                console.log(err);
            });

        });
    }


}

export default userTable;