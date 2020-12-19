import React from 'react';

const EventModal = (id) => {
    return (
        <div className="container">
            <div className="modal fade" id={`myModal${id}`}role="dialog">
                <div className="modal-dialog">
                    {/* Modal content*/}
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">×</button>
                            <h4 className="modal-title"></h4>
                        </div>
                        <div className="modal-body">
                            <p>Enter Event Details </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventModal