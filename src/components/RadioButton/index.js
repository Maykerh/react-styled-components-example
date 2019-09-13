import styled from 'styled-components';

const RadioButton = styled.div.attrs(props => ({
    type: 'submit',
    disabled: props.loading,
}))`
    display: flex;
    justify-content: flex-end;

    & button:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    & button:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    button {
        height: 30px;
        width: 80px;
        border: none;
        border-right: 1px solid #eee;
        color: #666;
        font-size: 14px;
        line-height: 1.4;
    }

    #${props => props.active} {
        color: #fff;
        background-color: #7159c1;
    }
`;

export default RadioButton;
