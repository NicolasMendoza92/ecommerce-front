import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product";


export default async function handle(req, res) {

    await mongooseConnect();
    // traemos los valores que enviamos con el formulario desde el front "query", por lo que filters es name y value (lo mismo q solicitamos en el selct ) y categories son los catIds
    const { categories, sort, ...filters } = req.query;
    let [sortField, sortOrder] = sort.split('_');

    const productsQuery = {};
    if(categories){
        productsQuery.category = categories.split(',');
        // esto hace que encuentre uno que coincida con lo seleccionado en los filtros de Category
    }
        
    // para las propiedades, es diferente por que se encuentran dentro de las propiedades del producto, como un objeto. Por lo que debemos primero ver si hay, y luego buscar independiente, ya sea color o storage en este caso
    if (Object.keys(filters).length > 0) {
        Object.keys(filters).forEach(filterName => {
            productsQuery['properties.' + filterName] = filters[filterName]
        })
    }
    res.json(await Product.find(
        productsQuery,
        null,
        {
            sort: { [sortField]: sortOrder==='asc'? 1 : -1 }
        }
    ));
}
