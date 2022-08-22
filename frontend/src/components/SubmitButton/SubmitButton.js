import { SubmitButtonWrapper } from './SubmitButton-style.js';

export default function SubmitButton({handleSubmit}) {
    return (
        <SubmitButtonWrapper onClick={() => handleSubmit()}/>
    )
}