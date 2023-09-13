import Center from '@/components/Center'
import Header from '@/components/Header'
import Input from '@/components/Input'
import ProductsGrid from '@/components/ProductsGrid';
import WhiteBox from '@/components/WhiteBox';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { getServerSession } from 'next-auth';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components'
import { authOptions } from './api/auth/[...nextauth]';
import { WishedProduct } from '@/models/WishedProduct';

const SearchInput = styled(Input)`
padding: 5px 10px;
border-radius: 5px;
margin: 30px 0px 30px;
font-size: 1.5rem;
`;



export default function SearchPage({ products, wishedProducts }) {

    const [prodSearched, setProdSearched] = useState('');
    const [prodFinded, setProdFinded] = useState([]);

    // using fort end, looking for by name,belongsCat and description
    useEffect(() => {
        let searchedProducts = [];
        if (prodSearched.length !== '') {

            searchedProducts = products.filter((prod) => {
                return prod.title.toLowerCase().includes(prodSearched.toLowerCase()) ||
                    prod.description.toLowerCase().includes(prodSearched.toLowerCase()) ||
                    prod.belongsCat.toLowerCase().includes(prodSearched.toLowerCase());
            });
            setProdFinded(searchedProducts);
        }
    }, [prodSearched,products])

    return (
        <>
            <Header />
            <Center>
                <SearchInput
                    value={prodSearched}
                    onChange={e => setProdSearched(e.target.value)}
                    placeholder="Search for products"
                    autoFocus
                />
                <ProductsGrid products={prodFinded} wishedProducts={wishedProducts} />
                {prodFinded.length === 0 &&
                    <WhiteBox>
                        <div>Ops :( no products found</div>
                    </WhiteBox>
                }
            </Center>
        </>
    )
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const products = await Product.find({}, null, { sort: { '_id': -1 } });
    // traemos datos del usuario logeado 
    const session = await getServerSession(context.req, context.res, authOptions);
    const wishedProducts = session?.user?
     await WishedProduct.find({
        userEmail: session?.user.email,
        product: products.map(p => p._id.toString()),
    })
    :[];
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
            wishedProducts:wishedProducts.map(wish => wish.product.toString()),
        }
    };
}