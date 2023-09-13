import styled from "styled-components";
import Button from "./Button";
import NextPage from "./icons/NextPage";
import PrevPage from "./icons/PrevPage";

const PaginationWrapper = styled.div`
display: flex;
justify-content: center;
margin: 10px;
align-items: center;
`

const PageIndicator = styled.div`
display: flex;
justify-content: center;
margin-bottom: 10px;
`
export const PaginationStore = ({ totalPages, setPageNumber, pageNumber }) => {

    const pages = new Array(totalPages).fill(null).map((v, i) => i);

    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
    };

    const gotoNext = () => {
        setPageNumber(Math.min(totalPages, pageNumber + 1));
    };

    return (
        <div>


            <PaginationWrapper>
                {pageNumber === 1 && (
                    <Button $block>
                       <PrevPage/>
                    </Button>
                )}
                {pageNumber > 1 && (
                    <Button $block
                        onClick={gotoPrevious}>
                        <PrevPage/>
                    </Button>
                )
                }
                {pages.map((pageIndex) => (
                    <Button $pagination key={pageIndex} onClick={() => setPageNumber(pageIndex + 1)}>
                        {pageIndex + 1}
                    </Button>
                ))}
                <Button $block onClick={gotoNext}>
                    <NextPage/>
                </Button >
            </PaginationWrapper>
            <PageIndicator>Page {pageNumber} of {totalPages}</PageIndicator>
        </div>
    )
}