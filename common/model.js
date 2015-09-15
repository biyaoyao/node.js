module.exports = {
    user: {
		user_id:{type:String,required: true},
        user_name: { type: String, required: true },
		 phone: { type: String, required: true },
        password: { type: String, required: true },
        gender: { type: String, default: true },
		province: { type: String, default: true },
		city: { type: String, default: true },
		cid: { type: String, default: true },
    }
};