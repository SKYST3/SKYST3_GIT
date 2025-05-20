from PIL import Image, ImageDraw

def portrait_image(image_path: str, output_path: str) -> None:
    image = Image.open(image_path).convert("L")  # Convert to grayscale

    # Convert to RGB to allow drawing in color (e.g., black lines on gray)
    image = image.convert("RGB")
    draw = ImageDraw.Draw(image)

    width, height = image.size
    thickness = width // 8
    padding = thickness * 2

    draw.line((width // 2 - padding, -padding, width + padding, width // 2 + padding), fill=(0, 0, 0), width=thickness)
    draw.line((width // 2 + padding, -padding, -padding, width // 2 + padding), fill=(0, 0, 0), width=thickness)

    # Optionally: draw a border or cross symbol
    draw.rectangle([(5, 5), (width - 5, height - 5)], outline=(0, 0, 0), width=3)

    # Save the edited image
    image.save(output_path)
    pass


if __name__ == "__main__":
    portrait_image("./data/uploads/12023 여권사진.jpg", "./data/uploads/12023 여권사진.jpg")