import { Schema, model } from 'mongoose';
import bcrypt from "bcryptjs"

// Define um novo esquema (schema) para documentos MongoDB representando imóveis
const UserSchema = new Schema({
    // Título do imóvel (do tipo String e obrigatório)
    name: {
        type: String,
        required: true,
    },
    
    // Preço do imóvel (do tipo Number, obrigatório, com valor padrão de 0)
    email: {
        type: String,
        required: true,
        default: 0,
        unique: true
    },

    // Descrição do imóvel (do tipo String e obrigatório)
    password: {
        type: String,
        required: true,
    },

    // Número de banheiros do imóvel (do tipo Number e obrigatório)
    status: {
        type: Boolean,
        required: true,
    }
});

UserSchema.pre('save', async function (next) {
	if (this.password) {
		const hash = await bcrypt.hash(this.password, 10);

		this.password = hash;
	}

	next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
	if (this._update.password) {
		const hash = await bcrypt.hash(this._update.password, 10);

		this._update.password = hash;
	}

	next();
});

// Exporta o modelo MongoDB baseado no esquema ImovelSchema, nomeando-o como 'Imovel'
export default model('User',UserSchema);