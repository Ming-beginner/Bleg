const errorStyle = {
    border: '2px solid red',
    background: 'rgba(255, 153, 153, 0.849)',
};
const successStyle = {
    border: '2px solid green',
    background: '#fff',
};
export default function validate(config) {
    function validateEmail() {
        let isEmail = String(config.node.value)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        handleValidate(
            isEmail,
            config.error || 'Invalid email',
            config.success || 'Valid email'
        );
        return isEmail;
    }

    function validatePassword() {
        let isCorrectPassword = config.node.value.length >= config.min;
        handleValidate(
            isCorrectPassword,
            config.error ||
            `Password must have at least ${config.min} characters`,
            config.success || 'Valid password'
        );
        return isCorrectPassword;
    }

    function validateRepeatPassword() {
        let isCorrectRepeatPassword = config.node.value === config.password;
        handleValidate(
            isCorrectRepeatPassword,
            config.error || 'Password and confirm password do not match',
            config.success || ''
        );
        return isCorrectRepeatPassword;
    }

    function validateRequire() {
        let isCorrectInput =
            Boolean(config.node.value) && config.node.value.length > 0;
        handleValidate(
            isCorrectInput,
            config.error || 'You must fill in this form',
            config.success || ''
        );
        return isCorrectInput;
    }

    function handleValidate(boolValue, errorText, successText) {
        if (!boolValue) {
            Object.assign(config.node.style, errorStyle);
            config.textNode.innerText = errorText;
            config.textNode.style.color = 'red';
        } else {
            Object.assign(config.node.style, successStyle);
            config.textNode.innerText = successText;
            config.textNode.style.color = 'green';
        }
    }
    switch (config.type) {
        case 'password':
            validatePassword();
            return validatePassword();
        case 'email':
            validateEmail();
            return validateEmail();
        case 'repeat-password':
            validateRepeatPassword();
            return validateRepeatPassword();
        case 'require':
            validateRequire();
            return validateRequire();
    }
}