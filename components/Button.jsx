export default function Button({ children, onClick, className }) {
    return (
        <button
            onClick={onClick}
            className={`bg-black cursor-pointer w-1/3 text-white px-4 py-4 my-8 rounded hover:bg-[#a5732db5]-700 transition ${className}`}
        >
            {children}
        </button>
    );
}
