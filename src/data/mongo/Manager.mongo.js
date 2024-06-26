class Manager {
    constructor(Model) {
        this.Model = Model;
    }

    async create (data) {
        try {
            const one = await this.Model.create(data);
            return one
        } catch (error) {
            throw error
        }
    }

/*    async read({ filter, options }) {
        try {
            options = { ...options, lean: true };
            const all = await this.Model.paginate(filter, options);
            if (all.totalDocs === 0) {
                const error = new Error("There aren't any document");
                error.statusCode = 404;
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }
*/
    async read(filter) {
        try {
            if (filter && filter.user_id) {
                const all = await this.Model.find({ user_id: filter.user_id });
                return all;
            } else {
                const all = await this.Model.find();
                return all;
            }
        } catch (error) {
            throw error;
        }
    }

    async paginate(filter, opts) {
        try {
            const all = await this.Model.paginate(filter, opts);
            return all
        } catch (error) {
            throw error
        }
    }

    async readOne(_id) {
        try {
            const one = await this.Model.findOne({ _id });
            console.log(one);
            return one;
        } catch (error) {
            throw error;
        }
    }

    async readByEmail(email) {
        try {
            const one = await this.Model.findOne({ email });
            return one
        } catch (error) {
            throw error
        }
    }

    async update (id, data) {
        try {
            const one  = await this.Model.findByIdAndUpdate(id, data, { new: true }); // new devuelve el objeto actualizado
            return one
        } catch (error) {
            throw error
        }
    }
//Nuevo
    async updatePartial(id, data) {
        try {
            const one = await this.Model.findByIdAndUpdate(id, { $set: data }, { new: true });
            return one;
        } catch (error) {
            throw error;
        }
    }

    async finalizePurchase(cid) {
        try {
            const cart = await this.Model.findByIdAndDelete(cid);
            return cart;
        } catch (error) {
            throw error;
        }
    }

    /*async findById(user_id) {
        try {
            const user = await this.Model.findById(user_id);
        } catch (error) {
            throw error
        }
    }*/
//
    async destroy (id) {
        try {
            const one = await this.Model.findByIdAndDelete(id);
            return one
        } catch (error) {
            throw error
        }
    }

    async aggregate(obj) {
        try {
            const result = await this.Model.aggregate(obj);
            return result;
        } catch (error) {
            throw error
        }
    }
}

export default Manager;