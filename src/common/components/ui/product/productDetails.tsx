export default function ProductDetails({ details }) {
    return (
        <div className="product-details">
            {details?.Product[0].producent && (
                <span className="brand">Producent: {details.Product[0].producent}</span>
            )}
            <br />
            {details?.Product[0].tw_id && (
                <span>Kod systemowy: {details.Product[0].tw_id}</span>
            )}
            <br />
            {details?.Product[0].kodpaskowy && (
                <span>Kod kreskowy: {details.Product[0].kodpaskowy}</span>
            )}
        </div>
    );
}