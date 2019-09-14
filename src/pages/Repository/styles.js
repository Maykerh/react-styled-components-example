import styled from 'styled-components';

export const Loading = styled.div`
    color: #666;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        color: #7159c1;
        font-size: 16px;
        text-decoration: none;
    }

    img {
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }

    h1 {
        font-size: 24px;
        margin-top: 10px;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #666;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }
`;

export const IssueList = styled.div`
    padding-top: 15px;
    margin-top: 15px;
    border-top: 1px solid #eee;
    list-style: none;
    height: 455px;
    overflow-y: auto;

    li {
        display: flex;
        padding: 15px 10px;
        border: 1px solid #eee;
        border-radius: 4px;

        & + li {
            margin-top: 10px;
        }

        img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #eee;
        }

        div {
            flex: 1;
            margin-left: 15px;

            strong {
                font-size: 16px;

                a {
                    text-decoration: none;
                    color: #333;

                    &:hover {
                        color: #7159c1;
                    }
                }

                span {
                    background: #eee;
                    colro: #333;
                    border-radius: 2px;
                    font-size: 12px;
                    font-weight: 20px;
                    height: 20px;
                    padding: 3px 4px;
                    margin-left: 10px;
                }
            }

            p {
                margin-top: 5px;
                font-size: 12px;
                color: #999;
            }
        }
    }
`;

export const Pagination = styled.div.attrs(props => ({
    disabled: props.disabled,
}))`
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    font-size: 18px;
    color: #666;

    div {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &[disabled] {
            cursor: not-allowed;
            opacity: 0.4;
        }

        span {
            font-size: 14px;

            user-select: none;
            margin: 0px 5px;
        }
    }

    #pipe {
        border: 1px solid #666;
        margin: 0px 5px;
        height: 15px;
    }
`;
