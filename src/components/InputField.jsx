// components/InputField.jsx
const InputField = ({ type, placeholder, value, onChange, name }) => (

    <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
    />

);

export default InputField;
