const addProductForm =
    document.getElementById("addProductForm");

const imageInput =
    document.getElementById("image");

const imagePreview =
    document.getElementById("imagePreview");


imageInput.addEventListener(
    "change",
    function () {

        const file = this.files[0];

        if (file) {

            const reader =
                new FileReader();

            reader.onload =
                function (event) {

                    imagePreview.src =
                        event.target.result;

                    imagePreview.style.display =
                        "block";

                };

            reader.readAsDataURL(file);

        }

    }
);


addProductForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document
            .getElementById("name")
            .value
            .trim();


        const description =
            document
            .getElementById("description")
            .value
            .trim();


        const price =
            parseFloat(
                document
                .getElementById("price")
                .value
            );


        const image =
            imageInput.files[0];


        if (
            !name ||
            !description ||
            !price ||
            !image
        ) {

            alert(
                "Please complete all fields."
            );

            return;

        }


        const product = {

            id: Date.now(),

            name: name,

            description: description,

            price: price,

            image: imagePreview.src

        };


        let products =
            JSON.parse(
                localStorage.getItem("products")
            ) || [];


        products.push(product);


        localStorage.setItem(
            "products",
            JSON.stringify(products)
        );


        const successMessage =
            document.getElementById(
                "successMessage"
            );


        successMessage.textContent =
            "Product Added Successfully!";


        successMessage.style.display =
            "block";


        addProductForm.reset();


        imagePreview.style.display =
            "none";


        imagePreview.src = "";

    }
);