export default function ProductImage({ image }) {
    return (
        <div className="product-image">
            <img src={image} alt="Produkt" />
        </div>
    );
}
