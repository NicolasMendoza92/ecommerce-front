import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import WhiteBox from "@/components/WhiteBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const CategoryHeader = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 15px;

@media screen and (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
`
const Sort = styled.div`
display:flex;
align-items: center;
background-color: #ddd;
padding:5px 10px;
border-radius:5px;
gap:5px;
color:#444;
select{
    background-color: transparent;
    border:0;
    font-size: inherit;
    color:#444;
}

@media screen and (max-width: 768px) {
    font-size: 12px;
    padding:2px;
  }
`
const FilterCatWrapper = styled.div`
display: flex;
gap:15px;
`
const FilterCat = styled.div`
display:flex;
align-items: center;
background-color: #ddd;
padding:5px 10px;
border-radius:5px;
gap:5px;
color:#444;
select{
    background-color: transparent;
    border:0;
    font-size: inherit;
    color:#444;
}
@media screen and (max-width: 768px) {
    font-size: 12px;
    padding:2px;
  }
`
// reenombramos producto como los iniciales, para ponerlo como estado inicial del useState
export default function CategoryPage({ category, subCategories, products: noFilterApplied }) {
    const [products, setProducts] = useState(noFilterApplied);
    // seteamos el estado sin filtros aplicados "value = all"
    const initialFilterState = category.properties.map(prop => ({ name: prop.name, value: 'all' }));
    const [filtersValues, setFilterValues] = useState(initialFilterState);
    const [sort, setSort] = useState('price-desc');
    const [loading, setLoading] = useState(false);

    function handleFilterChange(filterName, filterValue) {

        setFilterValues(prev => {
            return prev.map(p => ({
                name: p.name,
                value: p.name === filterName ? filterValue : p.value,
            }));

        })
    }

    // cuando cualquiera de los filtros cambie, se activa el useEffect
    useEffect(() => {
        setLoading(true)
        const catIds = [category._id, ...(subCategories?.map(c => c._id) || [])];
        // con "URLsarchparams" creamos una ruta y sus parametros, /categories/color/etc
        const params = new URLSearchParams;
        params.set('categories', catIds.join(','));
        params.set('sort', sort);
        filtersValues.forEach(f => {
            if (f.value !== 'all') {
                params.set(f.name, f.value);
            }
        });
        const apiUrl = `/api/products?` + params.toString();
        axios.get(apiUrl).then(res => {
            setProducts(res.data);
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        })
    }, [filtersValues, sort]);

    return (
        <>
            <Header />
            <Center>
                <CategoryHeader>
                    <h2>{category.name}</h2>
                    <FilterCatWrapper>
                        {/* dentro de la categoria Madre filtramos las propiedades que le aplicamos(color, storage etc) y las listamos por que es un array con nombre y valores separados por coma */}
                        {category.properties.map(prop => (
                            <FilterCat key={prop.name}>
                                <span>{prop.name}:</span>
                                <select
                                    // traigo el primer valor del select que sea igual al nombre de la prop
                                    value={filtersValues.find(f => f.name === prop.name).value}
                                    onChange={e => handleFilterChange(prop.name, e.target.value)}
                                >
                                    {/* traemos con map todos los posubles valores de propiedaes que tenemos seria looping dentro de:"categories.properties.prop.value" */}
                                    <option value="all">All</option>
                                    {prop.values.map(val => (
                                        <option key={val} value={val}>{val}</option>
                                    ))}
                                </select>
                            </FilterCat>
                        ))}
                        <Sort>
                            <span>Price:</span>
                            <select value={sort} onChange={e => setSort(e.target.value)}>
                                <option value="price_asc">Lowest first</option>
                                <option value="price_desc">Highest first</option>
                            </select>
                        </Sort>
                    </FilterCatWrapper>
                </CategoryHeader>
                {loading && (
                    <Spinner />
                )}
                {!loading && (
                    <div>
                        {products.length > 0 && (
                            <ProductsGrid products={products} />
                        )}
                        {products.length === 0 && (
                            <WhiteBox>
                                <div>Ops :( no products found</div>
                            </WhiteBox>
                        )}
                    </div>
                )}
            </Center>
        </>
    );
}

export async function getServerSideProps(context) {
    // traemos la categoria principal, en este caso "mobiles" es la que tiene las propiedes-
    const category = await Category.findById(context.query.id);
    // traemos las categorias que pertenezcan a la categoria seleccionada "mobiles" - hago console log y podremos ver que el parent es Id de categoria main mobile 
    const subCategories = await Category.find({ parent: category._id });
    // guardamos los IDs, tanto de la maincategory como el de las subcategories
    const catIds = [category._id, ...subCategories.map(c => c._id)];
    // buscamos entre los productos los que tengan category = catIds, ya sea igual a la mainCategory "mobile" o a una parentezca como "iphone, motorola etc"
    const products = await Product.find({ category: catIds });
    return {
        props: {
            category: JSON.parse(JSON.stringify(category)),
            products: JSON.parse(JSON.stringify(products)),
            subCategories: JSON.parse(JSON.stringify(subCategories)),
        }
    };
};