const deleteConversation = ({id, title, submit}) => {
    const deleteConfirm = confirm();

    if(!deleteConfirm) return;

    submit(
        {
        request_type: 'delete_conversation',
        conversation_id: id,
        conversation_title: title, 
        },
        {
            method: 'DELETE',
            encType: 'application/x-www-form-unlencoded',
            action: '/',
        }
)

    console.log('Conversation delete');
}

export default deleteConversation;