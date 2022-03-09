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
    handleValidate(isEmail, 'Invalid email', 'Valid email');
    return isEmail;
  }
  function validatePassword() {
    let isCorrectPassword = config.node.value.length >= config.min;
    handleValidate(
      isCorrectPassword,
      `Password must have at least ${config.min} characters`,
      'Valid password'
    );
    return isCorrectPassword;
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
  if (config.type === 'email') {
    validateEmail();
    return validateEmail();
  }
  if (config.type === 'password') {
    validatePassword();
    return validatePassword();
  }
}
