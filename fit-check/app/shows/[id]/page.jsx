import Modal from '../modal';
// import { fetchShowById } from '@/lib/api';

const ShowDetailPage = async ({ params }) => {
    const { id } = params; // ✅ Use params, not router.query
    console.log('Show ID:', id);

    if (!id) {
        return <p className="text-center">❌ Missing show ID.</p>;
    }

    // const show = await fetchShowById(id);

    // if (!show) {
    //     return <p className="text-center">❌ Show not found.</p>;
    // }

    return (
        <Modal>
            <h2 className="text-2xl font-bold mb-4">{"Hello"}</h2>
            {/* <img
                src={show.image_url || '/placeholder.jpg'}
                alt={show.title}
                className="w-full rounded-md mb-4"
            /> */}
        </Modal>
    );
};

export default ShowDetailPage;
