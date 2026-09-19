Dialogの共通化を実装
使用する際の実装例は以下
```
const { showConfirm } = useConfirmDialog();

const onClickDelete = () => {
    showConfirm({
        title: "削除確認",
        message: "本当に削除しますか？",
        onOk: handleDelete,
    });
};
```