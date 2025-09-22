import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '~/store';
import { addNode } from '~/store/workflowSlice';

const availableNodeTypes: { taskName: string, image: string, id: number }[] = [
    { id: 1, taskName: "Manual Trigger", image: "https://images.icon-icons.com/692/PNG/512/seo-social-web-network-internet_61_icon-icons.com_61516.png" },
    { id: 2, taskName: "Gmail", image: "https://images.icon-icons.com/2642/PNG/512/google_mail_gmail_logo_icon_159346.png" },
    { id: 3, taskName: "Telegram", image: "https://images.icon-icons.com/923/PNG/256/telegram_icon-icons.com_72055.png" },
    { id: 4, taskName: "Webhook", image: "https://images.seeklogo.com/logo-png/27/1/webhooks-logo-png_seeklogo-274079.png" },
    { id: 5, taskName: "Cron", image: "https://images.icon-icons.com/2063/PNG/512/clock_time_timer_alarm_settings_preferences_icon_124672.png" },
    { id: 6, taskName: "Gemini", image: "https://static.vecteezy.com/system/resources/previews/055/687/055/large_2x/rectangle-gemini-google-icon-symbol-logo-free-png.png" }
]

function Drawer({ show, onClose, placement, onSendData }: { show: boolean; onClose: () => void; placement: "end"; onSendData: any }) {
    const workflow = useSelector((state: RootState) => state.workflow);
    
    const dispatch = useDispatch<AppDispatch>();

    const handleAddNode = (task : any) => {
        const node = { ...task, type: "task", position: { x: 100, y: 100 }, data: { label: "Start" } };
        dispatch(addNode(node));
        onSendData(node)
    }

    return (
        <Offcanvas className='!bg-[var(--charcoal)] text-white' show={show} onHide={onClose} placement={placement} backdrop={false} scroll={true}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>What happens next?</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="p-0">
                <div className="flex flex-col">
                    {availableNodeTypes.map((task) =>
                        <div key={task.id} className="p-4 hover:bg-[#4d4d4d] cursor-pointer flex items-center" onClick={() => handleAddNode(task)}>
                            <div className="bg-[#414244] rounded-md mr-4">
                                <img className='bg-[var(--charcoal)] w-10 h-10' src={task.image} alt="" onClick={() => onSendData(task)} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-300">{task.taskName}</p>
                            </div>
                        </div>
                    )}
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default Drawer;

