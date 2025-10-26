 // components/RightPanel.js
import { useRestaurant } from "../context/RestaurantContext";

export default function RightPanel() {
  const { restaurant1, restaurant2 } = useRestaurant();

  const sum = (arr) => arr.reduce((s,x)=>s+(x.type==="income"?Number(x.amount||0):0),0);
  const sumExpense = (arr) => arr.reduce((s,x)=>s+(x.type==="expense"?Number(x.amount||0):0),0);

  const r1Income = sum(restaurant1);
  const r1Expense = sumExpense(restaurant1);
  const r2Income = sum(restaurant2);
  const r2Expense = sumExpense(restaurant2);

  return (
    <div className="card" style={{width:260}}>
      <h3 className="h2">🌤️ Berlin Hava Durumu</h3>
      <div className="small-muted">18°C • Açık</div>

      <hr style={{margin:"12px 0"}}/>

      <h3 className="h2">📅 Takvim</h3>
      <div className="small-muted">{new Date().toLocaleDateString("tr-TR", {day:"numeric", month:"long", year:"numeric"})}</div>

      <hr style={{margin:"12px 0"}}/>

      <h3 className="h2">📊 Restaurant Ciro</h3>
      <div className="small-muted">Restaurant 1: {r1Income - r1Expense} €</div>
      <div className="small-muted">Restaurant 2: {r2Income - r2Expense} €</div>
      <div style={{height:8}}/>
      <div className="small-muted">Toplam: {(r1Income - r1Expense) + (r2Income - r2Expense)} €</div>
    </div>
  );
}
