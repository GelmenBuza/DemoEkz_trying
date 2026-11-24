

export default function NoticeBanner({notice, setNotice}) {

    return (
        <div className={`notice notice-${notice.type}`}>
            <div className="notice-body">
                <strong>{notice.title}: </strong>
                <span>{notice.message}</span>
            </div>
            <button
                type="button"
                className="btn"
                onClick={() => setNotice(null)}
            >
                Закрыть
            </button>
        </div>
    )
}