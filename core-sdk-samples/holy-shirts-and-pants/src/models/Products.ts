const products: Product[] = [
    {
        id: '128113',
        label: 'Checkered Button Down',
        imageUrl: '/products/128113.png',
        altText: 'Checkered Formal',
        price: 15.99,
        category: 'Shirts',
        brand: 'Outdoor Livin',
        description: `
        Comfortable Checkered shirt that will keep you warm in all conditions!

- 4.2-ounce, 100% Airlume combed and ring spun cotton
- Retail fit
- Tear-away label
- Side seamed
- Shoulder taping
`,
        variants: {
            color: ['Orange and Blue', 'Red and Black'],
            size: ['XS', 'S', 'M', 'L', 'XL'],
        },
    },
    {
        id: '128115',
        label: 'Utility Pants',
        imageUrl: '/products/128115.png',
        altText: 'ATG Heavyweight Utility Pants',
        price: 29.99,
        category: 'Pants',
        brand: 'Wrangler',
        description: `
        Utility Pants have reinforced leg panels and kickplates so they can withstand even the most active adventures

- Straight Fit
- Slash front pockets Utility pocket on right front
- Welt watch pockets Welt back pockets
- Front let panels
- Articulated knees
- Kickplates
- 98% Cotton, 2% Spandex
`,
        variants: {
            color: ['Black', 'Desert', 'Navy'],
            size: ['XS', 'S', 'M', 'L', 'XL'],
        },
    },
    {
        id: '128114',
        label: 'Cargo Pants',
        imageUrl: '/products/128114.png',
        altText: 'Cargo Pants Streetwear',
        price: 34.99,
        category: 'Pants',
        brand: 'Street Stylz',
        description: `
        Comfortable pants with enough space to store all your valubles!

- Model wears size M and is 6'1"
- Fleece tapered cargo pants
- Breathable cotton-blend fabric
- Full-elastic waist with drawstring closure
- Tapered with a regular fit
- Functional cargo and patch pocket
- Recycled polyester
`,
        variants: {
            color: ['Kacki', 'Grey', 'Black'],
            size: ['XS', 'S', 'M', 'L', 'XL'],
        },
    },
    {
        id: '128747',
        label: 'Short Sleeve T-Shirt',
        imageUrl: '/products/128747.png',
        altText: 'Short Sleeve Perfect T-Shirt',
        category: 'Shirts',
        brand: 'Goodfellow & Co',
        price: 5.99,
        variants: {
            color: ['Black', 'Grey', 'Railroad Grey', 'Red Velvet', 'White'],
            size: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
        },
        description: `
        This standard fit short-sleeve tee features a solid color along with a classic crew-neck construction, giving you a touch of timeless style that can easily be paired with a variety of bottoms.

- Lightweight cotton-blend fabric provides all-day comfort
- Short-sleeve tee makes for a simple and versatile wardrobe staple
- Can easily be paired with a variety of bottoms for casual everyday wear
- Machine Wash & Tumble Dry
`,
    },
    {
        id: '128742',
        label: 'Long Sleeve Henley',
        imageUrl: '/products/128742.png',
        altText: "Men's Long Sleeve Henley T-Shirt",
        price: 14.99,
        category: 'Shirts',
        brand: 'Goodfellow & Co',
        variants: {
            color: ['Black', 'Grey', 'Maroon', 'Navy', 'White'],
            size: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
        },
        description: `
        The pullover T-shirt sports a classic three-button henley neckline and long sleeves with banded cuffs.

- Jersey henley T-shirt
- Made from 100% cotton
- Long sleeves with banded wrists
- 3-button henley neckline
- Regular fit, below-waist length
`,
    },
    {
        id: '128741',
        label: 'Chino Pants',
        imageUrl: '/products/128741.png',
        altText: 'Athletic Fit Chino Pants',
        price: 24.99,
        category: 'Pants',
        brand: 'Goodfellow & Co',
        variants: {
            color: ['Black', 'Khaki', 'Dapper Brown', 'Paris Green'],
            size: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
        },
        description: `
        These chino pants feature cotton twill construction, with added spandex supplementing breathable comfort with mobile elasticity.

- Men's athletic-fit chinos provide a stylish, versatile wardrobe option
- Made from stretch cotton twill for all-day softness and breathability
- Front and back pockets provide plenty of room for storing your essentials
- Pair easily with a variety of tops to fit the occasion
`,
    },
    {
        id: '128740',
        label: 'Long Sleeve T-Shirt',
        imageUrl: '/products/128740.png',
        altText: 'Textured Long Sleeve T-Shirt',
        price: 19.99,
        category: 'Shirts',
        brand: 'Goodfellow & Co',
        variants: {
            color: ['Black', 'Dark Grey', 'Dark Red', 'Green'],
            size: ['S', 'M', 'L', 'XL', '2XL'],
        },
        description: `
        Cozy and comfy, you'll love sporting this Textured Long-Sleeve T-Shirt to take on the cool-weather days in confident style.

- Textured long-sleeve tee
- Made from a soft cotton-blend fabric
- Crewneck style with a below-waist length
- Waffle-weave construction
- Designed with banded cuffs
- Solid hue
        `,
    },
    {
        id: '128744',
        label: 'Long Sleeve Pocket Tee',
        imageUrl: '/products/128744.png',
        altText: 'Long Sleeve Garment Dyed Pocket T-Shirt',
        price: 16.99,
        category: 'Shirts',
        brand: 'Goodfellow & Co',
        description: `
        Elevate your cool-weather closet with this Long Sleeve Garment Dyed Pocket T-Shirt

- Long Sleeve Garment Dyed Pocket T-shirt updates your everyday wardrobe
- Standard Fit
- 100% cotton lends breathable all-day comfort
- Chest patch pocket adds casual cool style
- Coordinates easily with a variety of bottoms for multiple outfits
        `,
        variants: {
            color: ['Black Heather', 'Botanical Blue', 'Forest Green'],
            size: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
        },
    },
    {
        id: '128745',
        label: 'Performance Flex Pant',
        imageUrl: '/products/128745.png',
        altText: 'Cool Right Slim Fit Flat Front Performance Flex Pant',
        price: 44.99,
        category: 'Pants',
        brand: 'Haggar',
        variants: {
            color: ['khaki', 'midnight', 'black', 'dark heather grey'],
            size: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
        },
        description: `
        The most versatile pant and will take you straight from the office to the golf course.

- Slim Fit, Flat Front, Wrinkle Free Pant
- 4-Way Stretch Fabric with Hidden Comfort Waistband
- 2 Front Slip Pockets, 2 Back Button Pockets
- Features Moisture Wicking CoolRight® Technology
- Machine Wash Care
`,
    },
    {
        id: '128272',
        label: 'Down Alternative Vest',
        imageUrl: '/products/128272.png',
        altText: 'Alpine Swiss Asher Mens Lightweight Down Alternative Vest',
        category: 'Jacket',
        brand: 'Alpine Swiss',
        price: 24.99,
        variants: {
            color: ['Red', 'Navy', 'Black'],
            size: ['S', 'M', 'L', 'XL'],
        },
        description: `
        The puffer vest is stylish and versatile for casual or outdoor activewear.

- STYLISH
- WARM
- WATER RESISTANT
- FUNCTIONAL
- EASY CARE AND STORAGE
`,
    },
    {
        id: '128746',
        label: 'Fleece Cargo Pants',
        imageUrl: '/products/128746.png',
        altText: 'Ultra Soft Fleece Tapered Cargo Pants',
        price: 29.99,
        category: 'Pants',
        brand: 'Goodfellow & Co',
        variants: {
            color: ['Black', 'Cement Grey', 'Charcoal Grey', 'Olive Green'],
            size: ['XS', 'S', 'M', 'L', 'XL'],
        },
        description: `
        Give your everyday wear a cozy, stylish update with these Ultra-Soft Fleece Tapered Cargo Pants

- Fleece tapered cargo pants
- Breathable cotton-blend fabric
- Full-elastic waist with drawstring closure
- Tapered with a regular fit
- Functional cargo and patch pocket
- Recycled polyester
`,
    },
    {
        id: '128737',
        label: 'Short Sleeve Striped T-Shirt',
        imageUrl: '/products/128737.png',
        altText: 'Short Sleeve Striped Novelty T-Shirt',
        price: 9.99,
        category: 'Shirt',
        brand: 'Goodfellow & Co',
        description: `
        Give a timeless twist to your everyday wear with this Short-Sleeve Striped Novelty T-Shirt

        - Black T-shirt with white stripes
        - Made of 100% cotton jersey
        - Crewneck and short sleeves
        - Standard fit, at-hip length
        `,
    },
];

export interface Product {
    id: string;
    label: string;
    altText: string;
    imageUrl: string;
    price: number;
    description: string;
    category?: string;
    brand?: string;
    couponCode?: string;
    position?: number;
    variants?: {
        color?: string[];
        size?: string[];
    };
}

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const formatCurrency = (num: number) =>
    `$${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;

export default products;
