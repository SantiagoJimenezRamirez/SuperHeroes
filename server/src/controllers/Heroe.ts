import { Request, Response } from "express"
import { Heroe } from "../models/heroes";


export const getAllsHeroes = async (req:Request, res:Response)=>{
    const listHeroes = await Heroe.findAll();

    res.json(listHeroes);
}


export const editHeroe = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
  
    // Validate if the hero exists in the database
    const heroe = await Heroe.findByPk(id);
  
    if (!heroe) {
      return res.status(404).json({
        msg: `Heroe with ID ${id} not found`
      });
    }
  
    // Update the hero
    try {
      await heroe.update({
        name,
        description
      });
  
      res.json({
        msg: `Heroe with ID ${id} updated successfully`
      });
    } catch (error) {
      res.status(400).json({
        msg: "Oops something went wrong: ",
        error
      });
    }
  }

export const addHeroes = async (req: Request, res: Response) => {
    const { name, description } = req.body;
        //Validate if it exists in the database
        const heroe = await Heroe.findOne({ where: { name : name } });

        if (heroe){
            return res.status(400).json({
                msg : `User ${name} exist in Database`
            })
        }

        try {
            await Heroe.create({
                name : name,
                description : description
            })
            res.json({
                msg: `User ${name} creted susecsfull`
            })
        } catch (error) {
            res.status(400).json({
                msg: "Oops something went wrong: ",
                error
            })
        }
}

export const deleteHeroeById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Eliminar el héroe por su ID
        const deletedRows = await Heroe.destroy({
            where: {
                id: id
            }
        });

        if (deletedRows === 0) {
            return res.status(404).json({
                msg: `Heroe with ID ${id} does not exist in Database`
            });
        }

        res.json({
            msg: `Heroe with ID ${id} deleted successfully`
        });
    } catch (error) {
        res.status(400).json({
            msg: "Oops, something went wrong:",
            error
        });
    }
}