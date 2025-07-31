const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080/api';

export const getToken = () => localStorage.getItem('adminToken') || '';

// fetch students function
export const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/admin/registrations`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
        setError('');
      } else {
        setError('Failed to fetch students');
      }
    } catch (err) {
      setError('Network error: Unable to fetch students');
      console.error('Fetch students error:', err);
    } finally {
      setLoading(false);
    }
  };

  export   const addCourse = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/courses`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseForm)
      });

      if (response.ok) {
        setSuccess('Course added successfully!');
        setCourseForm({ name: '', description: '', duration: '', fee: '', instructor: '' });
        setShowCourseModal(false);
        fetchCourses();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add course');
      }
    } catch (err) {
      setError('Network error: Unable to add course');
    } finally {
      setLoading(false);
    }
  };


// Fetch courses function
export const fetchCourses = async () => {
    try {
      const response = await fetch(`${backendUrl}/courses`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        console.error('Failed to fetch courses');
      }
    } catch (err) {
      console.error('Fetch courses error:', err);
    }
  };

// Register new student function
  export const registerStudent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/admin/students`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentForm)
      });

      if (response.ok) {
        setSuccess('Student registered successfully!');
        setStudentForm({ name: '', email: '', phone: '', course: '', status: 'pending' });
        setShowStudentModal(false);
        fetchStudents();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to register student');
      }
    } catch (err) {
      setError('Network error: Unable to register student');
      console.error('Register student error:', err);
    } finally {
      setLoading(false);
    }
  };

//update student function
  export const updateStudent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/admin/students/${editingStudent._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentForm)
      });

      if (response.ok) {
        setSuccess('Student updated successfully!');
        setStudentForm({ name: '', email: '', phone: '', course: '', status: 'pending' });
        setEditingStudent(null);
        setShowStudentModal(false);
        fetchStudents();
      } else {
        setError('Failed to update student');
      }
    } catch (err) {
      setError('Network error: Unable to update student');
    } finally {
      setLoading(false);
    }
  };

// Export others like registerStudent, updateStudent, deleteStudent, etc. similarly
