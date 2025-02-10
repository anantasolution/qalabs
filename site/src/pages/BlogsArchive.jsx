import { motion } from "framer-motion"
import BlogCardsPage from "../components/blogs/BlogCardsPage";

const BlogsArchive = ()=>{
    return (
        <>
            <div
                className="bg-cover bg-center bg-black/70 z-50"
                style={{
                    backgroundImage:
                        "url('https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/3d-black-paper-craft-cubic-patterned-background.jpg')",
                }}
            >
                <section className="text-center py-32">
                    <motion.h1
                        className="text-4xl sm:text-6xl font-bold text-[#7CD7F9]"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        Article & <span className="text-[#5CDA92]">News</span>
                    </motion.h1>
                    <motion.p
                        className="text-lg sm:text-xl font-semibold mt-4 text-white"
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        Archives
                    </motion.p>
                </section>
            </div>
            <BlogCardsPage />
        </>
    )
}

export default BlogsArchive;