/**
 * FILE DATA PORTFOLIO
 * -------------------
 * Cara Tambah Data:
 * Copy salah satu blok objek { ... } yang ada di bawah, 
 * paste di baris paling bawah array, lalu ubah isinya.
 * 
 * Tidak perlu menyentuh file HTML sama sekali!
 */

const portfolios = [
    {
        id: 1,
        title: "Bagas Trans Mandiri",
        category: "Brand Design",
        description: "Bagas Trans Mandiri is your trusted travel partner to explore the beauty of tourist destinations. With our premium car rental service, we provide the latest and high-quality fleet to ensure your journey is comfortable and safe. Whatever your destination, from family vacations to business trips, rely on us to provide an unforgettable travel experience. Enjoy limitless freedom and comfort with Bagas Trans Mandiri as your faithful travel companion.",
        image: "https://i.imgur.com/e4q20g6.png", // Gambar untuk di kartu (thumbnail)
        detailImage: [
            "https://i.imgur.com/GKFIM1W.jpeg",
            "https://i.imgur.com/45dOrts.jpeg"
        ],
        link: "#", // Tambahkan link project jika ada
        icon: "bx-car" // Icon cadangan
    },
    {
        id: 2,
        title: "Ochid",
        category: "Gaming Channel",
        description: "Ochid is a fun and energetic gaming channel where players dive into exciting adventures, tackle challenges, and explore creative worlds. From Minecraft builds and survival gameplay to other popular games, Ochid delivers entertaining content, tips, and epic moments that keep viewers engaged. Join the adventure, watch the action, and be part of the Ochid gaming community.",
        image: "https://i.imgur.com/ghIrwlr.jpeg",
        detailImage: [
            "https://i.imgur.com/k86lkXd.jpeg",
            "https://i.imgur.com/OutPJ3d.jpeg"
        ],
        link: "#",
        icon: "bx-joystick"
    },
    {
        id: 3,
        title: "ZeroMeal",
        category: "Brand Design",
        description: "ZeroMeal is a smart mobile application for managing food inventory, reducing food waste, and simplifying daily grocery shopping. With features like expiration tracking (via receipt scanning, manual input, or voice), recipe recommendations based on available ingredients, and meal planning, ZeroMeal helps users save and plan their consumption more wisely. The app is also integrated with local marketplaces for grocery shopping, creating an efficient and sustainable food ecosystem.",
        image: "https://i.imgur.com/EP6AKGO.png",
        detailImage: [
            "https://i.imgur.com/6sdMXI7.jpeg",
            "https://i.imgur.com/G2PdkmD.jpeg"
        ],
        link: "#",
        icon: "bx-mobile-alt"
    },
    {
        id: 4,
        title: "Kominfo Gunungkidul",
        category: "Internship",
        description: "For 6 months I underwent field work practice, often called PKL. I interned at the Gunungkidul Kominfo agency. There, I was assigned to help create graphic designs for posts on the Gunungkidul Regency Government and Gunungkidul Kominfo accounts. I also assisted in maintaining and troubleshooting network systems. Here are some of the posts that I have made.",
        image: "https://i.imgur.com/P7a8Cld.jpeg", // Gambar kecil untuk kartu
        // Sekarang detailImage bisa berupa array untuk menampilkan banyak foto bertumpuk di pop-up
        detailImage: [
            "https://i.imgur.com/5fLXADv.jpeg",
            "https://i.imgur.com/2qV7TxR.jpeg"
        ],
        link: "#",
        icon: "bx-briefcase"
    },
    {
        id: 5,
        title: "Prodi Sistem Informasi Universitas Amikom Yogyakarta",
        category: "Content Creator",
        description: "Producing creative digital content and managing social media engagement for the department.",
        image: "https://i.imgur.com/gQHjOBC.jpeg", // Gambar kecil untuk kartu
        detailImage: [
            "https://i.imgur.com/OCSsCYS.jpeg",
            "https://i.imgur.com/RlagdId.png"
        ],
        videoIntro: "Here are some Instagram and TikTok reels content that I produced during my time as a Content Creator:",
        videos: [
            "https://www.youtube.com/embed/gG0PzBa58dU",
            "https://www.youtube.com/embed/3jRpIkAjzgg",
            "https://www.youtube.com/embed/UKW6gMEu-68",
            { url: "https://www.youtube.com/embed/lE1q5viXcKI", orientation: "landscape" }
        ],
        link: "#",
        icon: "bx-camera"
    },
    {
        id: 6,
        title: "Asosiasi Perguruan Tinggi Informatika dan Ilmu Komputer (APTIKOM)",
        category: "Video Editor",
        description: "Acting as a video editor for APTIKOM activities, I am responsible for compiling footage, tidying up the visual flow, adjusting audio, and adding graphic elements to make the video appear more professional and informative.",
        image: "https://i.imgur.com/DXjShli.jpeg",
        videoOrientation: "landscape",
        videos: [
            "https://www.youtube.com/embed/dWhFHkvNb6E",
            "https://www.youtube.com/embed/xCy-Sbjf5aU",
            "https://www.youtube.com/embed/ew2UaWIt4VQ"
        ],
        link: "#",
        icon: "bx-video"
    },
    {
        id: 7,
        title: "Zeromeal",
        category: "UI/UX Design",
        description: " ",
        image: "https://i.imgur.com/Th8pDTf.png", // Gambar kecil untuk kartu
        detailImage: [
            "https://i.imgur.com/evVRlcz.jpeg"
        ],
        link: "#",
        icon: "bx-camera"
    },
    {
        id: 8,
        title: "Sasmita",
        category: "UI/UX Design",
        description: " ",
        image: "https://i.imgur.com/qHyfRZn.png", // Gambar kecil untuk kartu
        detailImage: [
            "https://i.imgur.com/w5VqtI6.png"
        ],
        link: "#",
        icon: "bx-camera"
    },
    {
        id: 9,
        title: "Shanum Laundry",
        category: "UI/UX Design",
        description: " ",
        image: "https://i.imgur.com/Znu1Jnx.png", // Gambar kecil untuk kartu
        detailImage: [
            "https://i.imgur.com/z07jTZi.png"
        ],
        link: "#",
        icon: "bx-camera"
    },
];
