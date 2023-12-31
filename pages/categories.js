import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { styled } from "styled-components";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";

const CategoryGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
gap: 20px;
@media screen and (min-width: 768px){
    grid-template-columns: 1fr 1fr 1fr 1fr;
}
`

const CategoriesHead = styled.div`
display: flex;
align-items: center;
gap: 20px;
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

a{
    color:#555;
}
`

const CategoryWrapper = styled.div`
margin-bottom: 40px;
`

const ShowAllSquare = styled(Link)`
display: flex;
align-items: center;
justify-content: center;
background-color:#ddd;
color:#555;
text-decoration: none;
height: 160px;
border-radius: 10px;

`

export default function CategoriesPage({ mainCategories, categoriesProducts, wishedProducts=[] }) {

    return (
        <div>
            <Header />
            <Center>
                {mainCategories.map(cat => (
                    <CategoryWrapper key={cat._id}>
                        <CategoriesHead>
                            <h2>{cat.name} </h2>
                            <div>
                                <Link href={'/category/' + cat._id}> Show all </Link>
                            </div>
                        </CategoriesHead>
                        <CategoryGrid>
                            {categoriesProducts[cat._id].map(p => (
                                <ProductBox key={p._id} {...p} wishedProducts={wishedProducts.includes(p._id)} />
                            ))}
                            <ShowAllSquare href={'category/' + cat._id}>
                                <b>Show all </b>
                            </ShowAllSquare>
                        </CategoryGrid>
                    </CategoryWrapper>
                ))}
            </Center>
        </div>
    )
}

export async function getServerSideProps(context) {
    const categories = await Category.find();
    const mainCategories = categories.filter(c => !c.parent);
    const allShownProductsId = [];
    // para cada categoria, definimos una categoria de productos
    const categoriesProducts = {};
    for (const mainCat of mainCategories) {
        // estos son los id de las categorias
        const mainCatId = mainCat._id.toString();
        // buscamos dentro de categories, una parent category que sea igual de igual id de alguna de las categorias (maincategories) y eso devolvera un array, por lo q hacemos map, para cada una de esas , devolver un id de cada una. 
        const childCatIds = categories
            .filter(c => c?.parent?.toString() === mainCatId)
            .map(c => c._id.toString());
        // esto contempla los id de las main y los child (parent)
        const categoriesIds = [mainCatId, ...childCatIds];
        const products = await Product.find({ category: categoriesIds }, null, { limit: 3, sort: { '_id': -1 } });
        // le enviamos todos los Id que aparecen en la pantalla maximo 9 (3x3) al array vacio de allShownProductsId
        allShownProductsId.push(...products.map(p => p._id.toString()))
        categoriesProducts[mainCat._id] = products;
    }
    // traemos datos del usuario logeado 
    const session = await getServerSession(context.req, context.res, authOptions);
    const wishedProducts = session?.user?
    await WishedProduct.find({
        userEmail: session.user.email,
        product: allShownProductsId,
    })
    :[];

    return {
        props: {
            mainCategories: JSON.parse(JSON.stringify(mainCategories)),
            categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
            wishedProducts:wishedProducts.map(wish=>wish.product.toString()),
        },

    };
}