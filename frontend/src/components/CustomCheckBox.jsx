import styled from 'styled-components'

// Este componente eu puxei do site UiVerse.io: https://uiverse.io/sssynk/tall-octopus-55

const CustomCheckBox = ({ checked = false, onChange }) => {
  return (
    <StyledWrapper>
      <label className="container">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="checkmark" />
      </label>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .container {
    display: inline-block;
    position: relative;
    cursor: pointer;
    font-size: 20px;
    user-select: none;
  }

  .checkmark {
    display: inline-block;
    width: 1.3em;
    height: 1.3em;
    background-color: #ccc;
    border-radius: 5px;
    transition: all 0.3s ease;
    position: relative;
  }

  .container input:checked ~ .checkmark {
    background: linear-gradient(45deg, #643ddb 0%, #d915ef 100%);
    transform: scale(1.1);
  }

  .checkmark:after {
    content: "";
    position: absolute;
    left: 0.45em;
    top: 0.25em;
    width: 0.25em;
    height: 0.5em;
    border: solid white;
    border-width: 0 0.15em 0.15em 0;
    transform: rotate(45deg);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .container input:checked ~ .checkmark:after {
    opacity: 1;
  }
`

export default CustomCheckBox