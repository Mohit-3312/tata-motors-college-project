import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.sql.*;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/book_test_drive_store")
public class book_test_drive_store extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public book_test_drive_store() {
        super();
    }

	protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
		response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setStatus(HttpServletResponse.SC_OK);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
		response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");

		PrintWriter out = response.getWriter();
		Gson gson = new Gson();
		Map<String, Object> responseMap = new HashMap<>();

		try {
			StringBuilder sb = new StringBuilder();
			String line;
			BufferedReader reader = request.getReader();
			while ((line = reader.readLine()) != null) {
				sb.append(line);
			}

			Type type = new TypeToken<Map<String, String>>(){}.getType();
			Map<String, String> data = gson.fromJson(sb.toString(), type);

			String customerName = data.get("customerName");
			String phone = data.get("phone");
			String email = data.get("email");
			String city = data.get("city");
			String carName = data.get("carName");
			String carCategory = data.get("carCategory");
			String preferredDate = data.get("preferredDate");
			String preferredSlot = data.get("preferredSlot");
			String testDriveLocation = data.get("testDriveLocation");

			Connection con = null;
			Class.forName("com.mysql.cj.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/tatadb?useSSL=false&allowPublicKeyRetrieval=true", "root", "");

			String query = "INSERT INTO test_drive_bookings (customer_name, phone, email, city, car_name, car_category, preferred_date, preferred_slot, test_drive_location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
			PreparedStatement ps = con.prepareStatement(query);

			ps.setString(1, customerName);
			ps.setString(2, phone);
			ps.setString(3, email);
			ps.setString(4, city);
			ps.setString(5, carName);
			ps.setString(6, carCategory);
			ps.setString(7, preferredDate);
			ps.setString(8, preferredSlot);
			ps.setString(9, testDriveLocation);

			int result = ps.executeUpdate();

			if (result > 0) {
				responseMap.put("status", "success");
				responseMap.put("message", "Test drive booked successfully");
			} else {
				responseMap.put("status", "error");
				responseMap.put("message", "Failed to book test drive");
			}

			out.println(gson.toJson(responseMap));
			ps.close();
			con.close();
		} catch (Error | ClassNotFoundException | SQLException e) {
			responseMap.put("status", "error");
			responseMap.put("message", e.getMessage());
			out.println(gson.toJson(responseMap));
		}
		out.close();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
}