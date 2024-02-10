import { styled } from "styled-components";
import Title from "./Title";
import Input from "./Input";
import WhiteBox from "./WhiteBox";
import StarsReview from "./StarsReview";
import TextArea from "./TextArea";
import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { v4 } from "uuid";
import StarsReviewed from "./StarsReviewed";
import { useRouter } from "next/router";

const Subtitle = styled.h3`
font-size: 1rem;
margin-bottom:5px ;
`

const ColsWrapper = styled.div`
display: grid;
grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
gap:40px;
`
const AllReviewsBox = styled.div`
border-bottom: 1px solid gray;
padding: 10px;
span{
    font-size: small;
}
`

const StarAndDate = styled.div`
margin-top: 5px;
display: flex;
align-items: center;
justify-content: space-between;
`

const ReviewGiven = styled.div`
display: flex;
flex-direction: column;
align-items: start;
h3{
    margin-top: 0px;
    margin-bottom: 0;
}
p{
    margin: 0px;
}
`
const ErrorDiv = styled.div`
background-color: red;
color: white;
padding:5px;
margin-top: 10px;
`

export default function ProductReviews({ product }) {

    const [titleReview, setTitleReview] = useState('');
    const [descriptionReview, setDescriptionReview] = useState('');
    const [stars, setStars] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [revLoading, setRevLoading] = useState(false);
    const router = useRouter()
    // handle errors 
    const [error, setError] = useState("");

    function submitReview() {
       
        if (!titleReview || !stars) {
            setError('Complete the fields');
            return;
        }
        setRevLoading(true)
        const data = { titleReview, descriptionReview, stars, product: product._id };
        axios.post('/api/reviews', data).then(res => {
            setDescriptionReview('');
            setTitleReview('');
            setStars(0);
            getProductReviews();
            router.reload()
        })
        setRevLoading(false);
    }

    const getProductReviews = async () => {
        setIsLoading(true);
        axios.get('/api/reviews?product=' + product._id).then(res => {
            setReviews(res.data);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getProductReviews();
    }, [])

    return (
        <div>
            <Title>Reviews</Title>
            <ColsWrapper>
                <WhiteBox>
                    <Subtitle>Add reviews</Subtitle>
                    <StarsReview onChange={setStars} />
                    <Input
                        placeholder="Title"
                        value={titleReview}
                        onChange={e => setTitleReview(e.target.value)} />
                    <TextArea
                        placeholder="Put your opinion "
                        value={descriptionReview}
                        onChange={e => setDescriptionReview(e.target.value)} />
                    <div>
                        {revLoading && (
                            <Button onClick={submitReview} $outline> <Spinner /></Button>
                        )}
                        <Button onClick={submitReview} $payment> Submit</Button>
                    </div>
                    {error && (
                        <ErrorDiv>
                            {error}
                        </ErrorDiv >
                    )}
                </WhiteBox>
                <WhiteBox>

                    <Subtitle>All reviews</Subtitle>
                    <hr />
                    {isLoading && (
                        <Spinner />
                    )}
                    {reviews.length === 0 && (

                        <p>This Product don't have any review :(</p>

                    )}
                    {reviews.length > 0 && reviews.map(rev => (
                        <AllReviewsBox key={v4()}>
                            <StarAndDate >
                                <StarsReviewed defaultHowMany={rev.stars} />
                                <span>{(new Date(rev.createdAt)).toLocaleString(
                                    "en-US",
                                    {
                                        month: "short",
                                        day: "2-digit",
                                        year: "numeric",
                                    }
                                )}
                                </span>
                            </StarAndDate>
                            <ReviewGiven>
                                <h3>{rev.titleReview}</h3>
                                <p>{rev.descriptionReview}</p>
                            </ReviewGiven>
                        </AllReviewsBox>
                    ))}
                </WhiteBox>
            </ColsWrapper>
        </div>
    )
}
