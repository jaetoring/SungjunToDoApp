import { TodoList } from "../types/todoList";

export const TodoListData: TodoList[] = [
    {
        id: 1,
        title: "코드 구현하기",
        description: "jira에 작성된 티켓 코드 구현해야 해",
        isDone: true,
    },
    {
        id: 2,
        title: "테스팅 성공하기",
        description: "코드 구현 후 커버리지에 맞춰서 테스팅을 진행해야 해",
        isDone: false,
    },
    {
        id: 3,
        title: "코드 리뷰 받고 수정하기",
        description: "코드 리뷰를 받고 피드백을 반영해서 다시 PR을 날려야 해",
        isDone: false,
    },
]